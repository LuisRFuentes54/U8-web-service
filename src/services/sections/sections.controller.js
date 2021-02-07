const logger = require("../../utils/logger");
const section = require("../../database/models/section.model");
const enrollment = require("../../database/models/enrollment.model");
const person = require("../../database/models/person.model");
const status = require("../../utils/status");
const types = require("../../utils/types");

const controller = {};
const context = "sections Controller";

controller.getAll = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting all sections`);
        const result = await section.findAll({
            where: {
                status: status.enable,
            }
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

controller.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.info(`[${context}]: Getting section [id:${id}]`);
        const result = await section.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if (!result){
            logger.warn(`[${context}]: section not found`)
            res.status(404).json({
                resp: "section not found",
            });
        }
        else
            res.json(result);
    } catch (error) {
        next(error);
    }
};

controller.create = async (req, res, next) => {
    try {
        const { name, description, creditUnit, semester, type, teoricHours, practiceHours, labHours, fkSchool } = req.body;
        logger.info(`[${context}]: Creating section`);
        await section.create({
            name,
            description,
            creditUnit,
            semester,
            type,
            teoricHours,
            practiceHours,
            labHours,
            fkSchool
        });
        res.json({
            resp: "section saved",
        });
    } catch (error) {
        next(error)
    }
};

controller.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.info(`[${context}]: Deleting section [id:${id}]`);
        const sectionOut = await section.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!sectionOut){
            logger.warn(`[${context}]: section not found`)
            res.status(404).json({
                resp: "section not found",
            });
        }
        else{
            sectionOut.status = status.disable;
            sectionOut.deletedDate = new Date();
            await sectionOut.save();
            res.json({
                resp: "section deleted",
            });
        }
    } catch (error) {
        next(error)
    }
};

controller.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, description, creditUnit, semester, type, teoricHours, practiceHours, labHours, fkSchool } = req.body;
        logger.info(`[${context}]: Updating section [id:${id}]`);
        const sectionUpdate = await section.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!sectionUpdate){
            logger.warn(`[${context}]: section not found`)
            res.status(404).json({
                resp: "section not found",
            });
        }
        else{
            if (name && name != "")
                sectionUpdate.name = name;
            if (description)
                sectionUpdate.description = description;
            if (creditUnit)
                sectionUpdate.creditUnit = creditUnit;
            if (semester)
                sectionUpdate.semester = semester;
            if (type)
                sectionUpdate.type = type;
            if (teoricHours)
                sectionUpdate.teoricHours = teoricHours;
            if (practiceHours)
                sectionUpdate.practiceHours = practiceHours;
            if (labHours)
                sectionUpdate.labHours = labHours;
            if (fkSchool)
                sectionUpdate.fkSchool = fkSchool;
            await sectionUpdate.save();
            res.json({
                resp: "section updated",
            });
        }
    } catch (error) {
        next(error)
    }
};

controller.addPerson = async (req, res, next) => {
    try {
        const idSection = req.params.ids;
        const idPerson = req.params.idp;
        const { type } = req.body;
        logger.info(`[${context}]: Registering person [${idPerson}] in section [${idSection}] with type [${type}]`);
        if(type != types.enrollment.student && type != types.enrollment.teacher){
            logger.warn(`[${context}]: Invalid enrollment type`);
            res.status(404).json({
                resp: "Invalid enrollment type",
            });
        }
        else {
            const personReq = await person.findOne({
                where: {
                    id: idPerson,
                    status: status.enable,
                }
            });
            if (!personReq){
                logger.warn(`[${context}]: Person not found`);
                res.status(404).json({
                    resp: "Person not found",
                });
            }
            else{
                const sectionReq = await section.findOne({
                    where: {
                        id: idSection,
                        status: status.enable,
                    }
                });
                if (!sectionReq){
                    logger.warn(`[${context}]: Section not found`);
                    res.status(404).json({
                        resp: "Section not found",
                    });
                } 
                else{
                    const actualEnrollment = await enrollment.findOne({
                        where: {
                            fkSection: idSection,
                            fkPerson: idPerson,
                            status: status.enable,
                        }
                    });
                    if (actualEnrollment){
                        logger.warn(`[${context}]: The person is already registered in a section`);
                        res.status(500).json({
                            resp: "The person is already registered in the section",
                        });
                    }
                    else{
                        await enrollment.create({
                            type,
                            fkPerson: idPerson,
                            fkSection: idSection
                        });
                        res.status(200).json({
                            resp: "Person registered in the section",
                        });
                    }
                }
            }
        }
    } catch (error) {
        next(error);
    }
};

controller.deletePerson = async (req, res, next) => {
    try {
        const idSection = req.params.ids;
        const idPerson = req.params.idp;
        logger.info(`[${context}]: Deleting person [${idPerson}] in section [${idSection}]`);
        const actualEnrollment = await enrollment.findOne({
            where:{
                fkSection: idSection,
                fkPerson: idPerson,
                status: status.enable,
            }
        });
        if(!actualEnrollment){
            logger.warn(`[${context}]: The person is not registered in the section`);
            res.status(404).json({
                resp: "The person is not already registered in the section",
            });
        }
        else{
            actualEnrollment.status = status.disable;
            actualEnrollment.deletedDate = new Date();
            await actualEnrollment.save();
            res.status(200).json({
                resp: "Person removed from section",
            })
        }
    } catch (error) {
        next(error);
    }
};

module.exports = controller;
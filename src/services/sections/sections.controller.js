const logger = require("../../utils/logger");
const section = require("../../database/models/section.model");
const status = require("../../utils/status");

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

module.exports = controller;
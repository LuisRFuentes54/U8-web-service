const logger = require("../../utils/logger");
const school = require("../../database/models/school.model");
const status = require("../../utils/status");
const sectionController = require ("../sections/sections.controller");
const { section } = require("../../utils/types");
const Section = require("../../database/models/section.model");

const controller = {};
const context = "Schools Controller";

controller.getAll = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting all schools`);
        const result = await school.findAll({
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
        logger.info(`[${context}]: Getting school [id:${id}]`);
        const result = await school.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if (!result){
            logger.warn(`[${context}]: school not found`)
            res.status(404).json({
                resp: "school not found",
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
        const { name, description, fkFaculty } = req.body;
        logger.info(`[${context}]: Creating school`);
        await school.create({
            name,
            description,
            fkFaculty
        });
        res.json({
            resp: "school saved",
        });
    } catch (error) {
        next(error)
    }
};

controller.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.info(`[${context}]: Deleting school [id:${id}]`);
        var response = controller.deleteSchool(id);
        if (response == 404){ 
            res.status(404).json({
                resp: "school not found",
            });
        }
        else {
            res.json({
                resp: "school deleted",
            });
        }
    } catch (error) {
        next(error)
    }
};

controller.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, description, fkFaculty } = req.body;
        logger.info(`[${context}]: Updating school [id:${id}]`);
        const schoolUpdate = await school.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!schoolUpdate){
            logger.warn(`[${context}]: school not found`)
            res.status(404).json({
                resp: "school not found",
            });
        }
        else{
            if (name && name != "")
                schoolUpdate.name = name;
            if (description)
                schoolUpdate.description = description;
            if (fkFaculty)
                schoolUpdate.fkFaculty = fkFaculty;
            await schoolUpdate.save();
            res.json({
                resp: "school updated",
            });
        }
    } catch (error) {
        next(error)
    }
};

controller.deleteSchool = async (id) => {
    try{
        var response;
        const sectionsOut = await Section.findAll({
            where: {
                fkSchool: id,
                status: status.enable
            }
        });
        if(!sectionsOut){
            logger.warn(`[${context}]: seccions not found for this section [${id}] `)
        }
        else{
            for (var i=0; i<sectionsOut.length; i++){
               sectionController.deleteSection(sectionsOut[i].dataValues.id);
            } 
        }
        
        const schoolOut = await school.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });

        if(!schoolOut){
            logger.warn(`[${context}]: school not found`)
            response = 404;
        }
        else{
            schoolOut.status = status.disable;
            schoolOut.deletedDate = new Date();
            await schoolOut.save();
            logger.info(`[${context}]: school [${id}] has been deleted successfully`)
            response = 202;
        }
        return response; 
    }catch (error) {
        next(error)
    }
}

module.exports = controller;
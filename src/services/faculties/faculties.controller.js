const logger = require("../../utils/logger");
const faculty = require("../../database/models/faculty.model");
const status = require("../../utils/status");
const schoolController = require ("../schools/schools.controller");
const School = require("../../database/models/school.model");

const controller = {};
const context = "Faculties Controller";

controller.getAll = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting all faculties`);
        const result = await faculty.findAll({
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
        logger.info(`[${context}]: Getting faculty [id:${id}]`);
        const result = await faculty.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if (!result){
            logger.warn(`[${context}]: Faculty not found`)
            res.status(404).json({
                resp: "Faculty not found",
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
        const { name, description } = req.body;
        logger.info(`[${context}]: Creating faculty`);
        await faculty.create({
            name,
            description
        });
        res.json({
            resp: "Faculty saved",
        });
    } catch (error) {
        next(error)
    }
};

controller.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.info(`[${context}]: Deleting faculty [id:${id}]`);
        var response = controller.deleteFaculty(id);
        if (response == 404){
            res.status(404).json({
                resp: "Faculty not found",
            });
        }
        else {
            res.json({
                resp: "Faculty deleted",
            });
        }
    } catch (error) {
        next(error)
    }
};

controller.deleteFaculty = async(id) => {
    try {
        var response; 
        const schoolsOut = await School.findAll({
            where:{
                fkFaculty:id,
                status:status.enable
            }
        })
        if(!schoolsOut){
            logger.warn(`[${context}]: schools not found for this faculty [${id}] `)
        }
        else{
            for (var i=0; i<schoolsOut.length; i++){
              schoolController.deleteSchool(schoolsOut[i].dataValues.id);
            } 
        }
        const facultyOut = await faculty.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!facultyOut){
            logger.warn(`[${context}]: Faculty not found`) 
            response = 404;
        }
        else{
            facultyOut.status = status.disable;
            facultyOut.deletedDate = new Date();
            await facultyOut.save();
            logger.info(`[${context}]: Faculty [${id}] has been deleted successfully`);
            response = 202;
        }
        return response;
    }

    catch (error){
        next(error)
    }
}

controller.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        logger.info(`[${context}]: Updating faculty [id:${id}]`);
        const facultyUpdate = await faculty.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!facultyUpdate){
            logger.warn(`[${context}]: Faculty not found`)
            res.status(404).json({
                resp: "Faculty not found",
            });
        }
        else{
            if (name && name != "")
                facultyUpdate.name = name;
            if (description)
                facultyUpdate.description = description;
            await facultyUpdate.save();
            res.json({
                resp: "Faculty updated",
            });
        }
    } catch (error) {
        next(error)
    }
};

module.exports = controller;
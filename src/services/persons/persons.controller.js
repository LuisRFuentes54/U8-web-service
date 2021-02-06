const logger = require("../../utils/logger");
const person = require ("../../database/models/person.model");
const status = require("../../utils/status");

const controller = {};
const context = "Persons Controller";

controller.getAll = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting all persons`);
        const result = await person.findAll({
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
        logger.info(`[${context}]: Getting person [id:${id}]`);
        const result = await person.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if (!result){
            logger.warn(`[${context}]: person not found`)
            res.status(404).json({
                resp: "person not found",
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
        const { ci, firstName, lastName } = req.body;
        logger.info(`[${context}]: Creating person`);
        await person.create({
            ci,
            firstName,
            lastName
        });
        res.json({
            resp: "person saved",
        });
    } catch (error) {
        next(error)
    }
};

controller.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        logger.info(`[${context}]: Deleting person [id:${id}]`);
        const PersonOut = await person.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!PersonOut){
            logger.warn(`[${context}]: person not found`)
            res.status(404).json({
                resp: "person not found",
            });
        }
        else{
            PersonOut.status = status.disable;
            PersonOut.deletedDate = new Date();
            await PersonOut.save();
            res.json({
                resp: "person deleted",
            });
        }
    } catch (error) {
        next(error)
    }
};

controller.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {ci, firstName, lastName } = req.body;
        logger.info(`[${context}]: Updating person [id:${id}]`);
        const PersonUpdate = await person.findOne({
            where: {
                id: id,
                status: status.enable,
            }
        });
        if(!PersonUpdate){
            logger.warn(`[${context}]: person not found`)
            res.status(404).json({
                resp: "person not found",
            });
        }
        else{
            if (ci && ci != "")
                PersonUpdate.name =ci;
            if (firstName)
                PersonUpdate.firstName = firstName;
            if (lastName)
                PersonUpdate.lastName = lastName;
            await PersonUpdate.save();
            res.json({
                resp: "Person updated",
            });
        }
    } catch (error) {
        next(error)
    }
};

module.exports = controller;
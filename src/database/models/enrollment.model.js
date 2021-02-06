const orm = require("sequelize");
const connection = require("../connection");
const status = require("../../utils/status");
const types = require("../../utils/types");

const Enrollment = connection.define("enrollment", {
    id: {
        field: "e_id",
        type: orm.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    status: {
        field: "e_status",
        type: orm.STRING,
        length: 8,
        defaultValue: status.enable,
        allowNull: false,
        validate: {
            isIn: {
                args: [[status.enable, status.disable]],
                msg: "Status must be enable or disable",
            }
        }
    },
    createdDate: {
        field: "e_created_date",
        type: orm.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
    deletedDate: {
        field: "e_deleted_date",
        type: orm.DATE,
        allowNull: true,
    },
    type: {
        field: "e_type",
        type: orm.STRING,
        length: 7,
        allowNull: false,
        validate: {
            isIn: {
                args: [[types.enrollment.student, types.enrollment.teacher]],
                msg: "Enrollment type must be student or teacher",
            }
        }
    },
    fkSection: {
        field: "e_se_fk_id",
        type: orm.INTEGER,
        allowNull: false
    },
    fkPerson: {
        field: "e_p_fk_id",
        type: orm.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Enrollment;
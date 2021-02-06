const orm = require("sequelize");
const connection = require("../connection");
const status = require("../../utils/status");
const Section = require("./section.model");

const School = connection.define("school", {
    id: {
        field: "sc_id",
        type: orm.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        field: "sc_name",
        type: orm.STRING,
        length: 40,
        allowNull: false
    },
    description: {
        field: "sc_description",
        type: orm.TEXT,
        allowNull: true,
    },
    status: {
        field: "sc_status",
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
        field: "sc_created_date",
        type: orm.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
    deletedDate: {
        field: "sc_deleted_date",
        type: orm.DATE,
        allowNull: true,
    },
    fkFaculty: {
        field: "sc_f_fk_id",
        type: orm.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

School.hasMany(Section, { foreignKey: "fkSchool", sourceKey: "id" });
Section.belongsTo(School, { foreignKey: "fkSchool", sourceKey: "id" });

module.exports = School;
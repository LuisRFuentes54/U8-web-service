const orm = require("sequelize");
const connection = require("../connection");
const status = require("../../utils/status");
const types = require("../../utils/types");
const Enrollment = require("./enrollment.model");

const Section = connection.define("section", {
    id: {
        field: "se_id",
        type: orm.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        field: "se_name",
        type: orm.STRING,
        length: 40,
        allowNull: false
    },
    description: {
        field: "se_description",
        type: orm.TEXT,
        allowNull: true,
    },
    status: {
        field: "se_status",
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
        field: "se_created_date",
        type: orm.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
    deletedDate: {
        field: "se_deleted_date",
        type: orm.DATE,
        allowNull: true,
    },
    creditUnit: {
        field: "se_uc",
        type: orm.INTEGER,
        allowNull: false
    },
    semester: {
        field: "se_semester",
        type: orm.INTEGER,
        allowNull: false,
    },
    type: {
        field: "se_type",
        type: orm.STRING,
        length: 9,
        allowNull: false,
        validate: {
            isIn: {
                args: [[types.section.mandatory, types.section.elective]],
                msg: "Section type must be mandatory or elective",
            }
        }
    },
    teoricHours: {
        field: "se_ht",
        type: orm.DECIMAL(2,2),
        allowNull: false
    },
    practiceHours: {
        field: "se_hp",
        type: orm.DECIMAL(2,2),
        allowNull: false
    },
    labHours: {
        field: "se_hl",
        type: orm.DECIMAL(2,2),
        allowNull: false
    },
    fkSchool: {
        field: "se_sc_fk_id",
        type: orm.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Section.hasMany(Enrollment, { foreignKey: "fkSection", sourceKey: "id" });
Enrollment.belongsTo(Section, { foreignKey: "fkSection", sourceKey: "id" });

module.exports = Section;
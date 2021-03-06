const orm = require("sequelize");
const connection = require("../connection");
const status = require("../../utils/status");
const School = require("./school.model");

const Faculty = connection.define("faculty", {
    id: {
        field: "f_id",
        type: orm.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        field: "f_name",
        type: orm.STRING,
        length: 40,
        allowNull: false
    },
    description: {
        field: "f_description",
        type: orm.TEXT,
        allowNull: true,
    },
    status: {
        field: "f_status",
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
        field: "f_created_date",
        type: orm.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
    deletedDate: {
        field: "f_deleted_date",
        type: orm.DATE,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

Faculty.hasMany(School, { foreignKey: "fkFaculty", sourceKey: "id" });
School.belongsTo(Faculty, { foreignKey: "fkFaculty", sourceKey: "id" });

module.exports = Faculty;
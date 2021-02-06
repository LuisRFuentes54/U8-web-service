const orm = require("sequelize");
const connection = require("../connection");
const status = require("../../utils/status");
const Enrollment = require("./enrollment.model");

const Person = connection.define("person", {
    id: {
        field: "p_id",
        type: orm.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    ci: {
        field: "p_ci",
        type: orm.STRING,
        length: 10,
        allowNull: false,
        unique: true
    },
    firstName: {
        field: "p_first_name",
        type: orm.STRING,
        length: 50,
        allowNull: false,
    },
    lastName: {
        field: "p_last_name",
        type: orm.STRING,
        length: 50,
        allowNull: false,
    },
    status: {
        field: "p_status",
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
        field: "p_created_date",
        type: orm.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
    deletedDate: {
        field: "p_deleted_date",
        type: orm.DATE,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

Person.hasMany(Enrollment, { foreignKey: "fkPerson", sourceKey: "id" });
Enrollment.belongsTo(Person, { foreignKey: "fkPerson", sourceKey: "id" });

module.exports = Person;
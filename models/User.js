const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/config");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        // Finish the user model
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            beforeUpdate: async (updateUser) => {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: "User"
    }
);

module.exports = User;
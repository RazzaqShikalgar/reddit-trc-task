import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/reddit', {
    dialect: 'postgres',
    logging: false,

});

export default sequelize;
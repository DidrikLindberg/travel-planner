const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class Trip extends Model {}

// create fields/columns for Trip model
Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    trip_budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    traveller_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  //🔑 We want a Trip model to be the joining table (or through table, in Sequelize terms) between locations and travellers, 
  //so we create foreign key columns for both. 
  //See the following code for an example:
    traveller_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'traveller',
        key: 'id',
        //need to place on both the table and the relationship
        unique: false
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
        //need to place on both the table and the relationship
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip'
  })

  module.exports = Trip;

  
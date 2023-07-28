module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      _id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Images
};

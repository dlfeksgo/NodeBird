module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			// id는 기본적으로 들어있다. 1,2,3...
			email: {
				type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
				allowNull: false, //필수
				unique: true, //중복 안됨
			},
			nickname: {
				type: DataTypes.STRING(30),
				allowNull: false, //필수
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false, //필수
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
		}
	);
	User.associate = (db) => {
		db.User.hasMany(db.Post);
		db.User.hasMany(db.Comment);
		db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followers',
			foreignKey: 'FollowingId',
		});
		db.User.belongsToMany(db.User, {
			through: 'Follow',
			as: 'Followings',
			foreignKey: 'FollowerId',
		});
	};
	return User;
};

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  level: {type: DataTypes.INTEGER, require: true, defaultValue: 0},
  group_id: {type: DataTypes.INTEGER}
}) 

const UserGroup = sequelize.define('usergroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true}
}) 

const Content = sequelize.define('content', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  source: {type: DataTypes.STRING},
  link: {type: DataTypes.STRING},
  date_upload: {type: DataTypes.DATE},
  date_last_change: {type: DataTypes.DATE},
  is_approved: {type: DataTypes.BOOLEAN},
  author_id: {type: DataTypes.INTEGER}
}) 

const Playlist = sequelize.define('playlist', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true}
}) 

const DeviceGroup = sequelize.define('devicegroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
  outer_link: {type: DataTypes.STRING}
}) 

const Schedule = sequelize.define('schedule', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  time_start: {type: DataTypes.TIME, require: true},
  time_end: {type: DataTypes.TIME, require: true}
})

const ContentInPlaylist = sequelize.define('contentInPlaylist', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  position: {type: DataTypes.INTEGER},
  playlist_id: {type: DataTypes.INTEGER, require: true},
  content_id: {type: DataTypes.INTEGER, require: true}
})

const UserControlDeviceGroup = sequelize.define('userControlDeviceGroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  users_id: {type: DataTypes.INTEGER, require: true},
  devices_id: {type: DataTypes.INTEGER, require: true}
})

UserGroup.hasMany(User)
User.belongsTo(UserGroup)

User.hasMany(Content)
Content.belongsTo(User)

DeviceGroup.hasMany(Schedule)
Schedule.belongsTo(DeviceGroup)

Playlist.hasMany(Schedule)
Schedule.belongsTo(Playlist)

Content.hasMany(ContentInPlaylist)
ContentInPlaylist.belongsTo(Content)

Playlist.hasMany(ContentInPlaylist)
ContentInPlaylist.belongsTo(Playlist)


UserGroup.belongsToMany(DeviceGroup, {
  through: UserControlDeviceGroup,
  as: 'devices',
  foreignKey: 'users_id'
})
DeviceGroup.belongsToMany(UserGroup, {
  through: UserControlDeviceGroup,
  as: 'users',
  foreignKey: 'devices_id'
})

/*
UserGroup.belongsToMany(DeviceGroup, {
  through: UserControlDeviceGroup
})
DeviceGroup.belongsToMany(UserGroup, {
  through: UserControlDeviceGroup
})
*/

module.exports = {
  User,
  UserGroup,
  Content,
  Playlist,
  DeviceGroup,
  Schedule,
  ContentInPlaylist,
  UserControlDeviceGroup
}
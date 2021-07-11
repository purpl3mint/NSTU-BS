const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING}
}) 

const UserGroup = sequelize.define('usergroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
  restrictions: {type: DataTypes.INTEGER}
}) 

const Content = sequelize.define('content', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  source: {type: DataTypes.STRING},
  link: {type: DataTypes.STRING, unique: true},
  date_creation: {type: DataTypes.DATE},
  date_last_change: {type: DataTypes.DATE},
  is_approved: {type: DataTypes.BOOLEAN}
}) 

const Playlist = sequelize.define('playlist', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true}
}) 

const DeviceGroup = sequelize.define('devicegroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true}
}) 

const ContentInPlaylist = sequelize.define('contentInPlaylist', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  position: {type: DataTypes.INTEGER, unique: true}
})

const PlaylistForDevicesGroup = sequelize.define('playlistForDevicesGroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  time_start: {type: DataTypes.TIME, require: true},
  time_end: {type: DataTypes.TIME, require: true}
})

const UserControlDeviceGroup = sequelize.define('userControlDeviceGroup', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

UserGroup.hasMany(User)
User.belongsTo(UserGroup)

User.hasMany(Content)
Content.belongsTo(User)

Content.belongsToMany(Playlist, {through: ContentInPlaylist})
Playlist.belongsToMany(Content, {through: ContentInPlaylist})

DeviceGroup.belongsToMany(Playlist, {through: PlaylistForDevicesGroup})
Playlist.belongsToMany(DeviceGroup, {through: PlaylistForDevicesGroup})

UserGroup.belongsToMany(DeviceGroup, {through: UserControlDeviceGroup})
DeviceGroup.belongsToMany(UserGroup, {through: UserControlDeviceGroup})

module.exports = {
  User,
  UserGroup,
  Content,
  Playlist,
  DeviceGroup
}
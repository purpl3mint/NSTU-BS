function mapStateToProps(component) {
  switch(component) {
    case 'DeviceGroupAddPage': {
      return function (state) {
        return {
          isSucceed: state.deviceGroup.isSucceed,
          form: state.deviceGroup.form
        }
      }
    }

    default: return undefined
  }
}

export default mapStateToProps
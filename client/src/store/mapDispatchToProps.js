import { bindActionCreators } from "redux";
import { deviceGroupSetSucceed, deviceGroupSetForm} from './actionCreators/deviceGroupActionCreator'

function mapDispatchToProps(component) {
  switch(component) {
    case 'DeviceGroupAddPage': return function(dispatch){
      return {
        setIsSucceed: bindActionCreators(deviceGroupSetSucceed, dispatch),
        setForm: bindActionCreators(deviceGroupSetForm, dispatch)
      }
    }

    default: return undefined;
  }
}

export default mapDispatchToProps
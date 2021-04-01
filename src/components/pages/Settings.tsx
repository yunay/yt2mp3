import { remote } from 'electron';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppContext, AppStore } from '../../AppContext';
import { AppSettings } from '../../models/AppSettings';

const Settings = observer(() => {
  const appContext = React.useContext<AppStore>(AppContext);

  const onPathChangeBtnClick = ()=>{
    remote.dialog.showOpenDialog({properties: ['openDirectory'],filters: [{ name: 'Music', extensions: ['mp3'] }]})
    .then((result)=>{
      if (result.filePaths && result.filePaths.length > 0) {
        let newSettings = new AppSettings(result.filePaths[0], appContext.settings.id)
        appContext.updateSettings(newSettings);
      }
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 fw-bold">Път на съхранение на изтеглените файлове</div>
        <div className="col-8">
          <input
            className="form-control"
            disabled
            value={appContext.settings.downloadPath}
            onChange={()=>{}}
          />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-primary mb-3" onClick={onPathChangeBtnClick}>
            Промени
          </button>
        </div>
      </div>
    </div>
  );
});

export default Settings;

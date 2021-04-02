import { remote } from 'electron';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { AppContext, AppStore } from '../../AppContext';
import { MediaType } from '../../models/Enums';

const History = observer(() => {
  const appContext = React.useContext<AppStore>(AppContext);
  const [windowHeight, setWindowHeight] = useState(remote.getCurrentWindow().getBounds().height);

  useEffect(() => {
    addEventListener('resize', onWidnowRezise);
    return () => {
      removeEventListener('resize', onWidnowRezise);
    };
  }, []);

  const onWidnowRezise = () => {
    setWindowHeight(remote.getCurrentWindow().getBounds().height);
  };

  if (appContext.historyRecords == null) {
    return <div>Loading...</div>;
  } else if (appContext.historyRecords.length == 0) {
    return (
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">🙊 🙉 🙈 </h4>
        <h5 className="alert-heading">Няма намерени записи.</h5>
      </div>
    );
  } else {
    return (
        <div id="history-results">
          <div className="table-head">
            <div className="row">
              <div className="col-1">№</div>
              <div className="col-7">Наименование</div>
              <div className="col-1">Формат</div>
              <div className="col-2">Дата на изтегляне</div>
              <div className="col-1">
                <span
                  onClick={() => appContext.clearAllHistory()}
                  className="no-styled-btn"
                >
                  🗑
                </span>
              </div>
            </div>
          </div>
          <div className="table-body" style={{ height: windowHeight / 1.3 }}>
            {appContext.historyRecords.map((record, index) => {
              return (
                <div className="row" key={record.youtubeResult.id.videoId}>
                  <div className="col-1">{index + 1}</div>
                  <div className="col-7">
                    {record.youtubeResult.snippet.title}
                  </div>
                  <div className="col-1">
                    {record.downloadContentType == MediaType.mp3 ? '🎵' : '🎬'}
                  </div>
                  <div className="col-2">
                    {record.downloadedOn.toLocaleString()}
                  </div>
                  <div className="col-1">
                    <span
                      className="no-styled-btn"
                      onClick={() => appContext.removeHistoryRecord(record)}
                    >
                      {' '}
                      ➖{' '}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
  }
});

export default History;

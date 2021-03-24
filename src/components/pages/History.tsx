import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppContext, AppData } from '../../AppContext';
import { MediaType } from '../../models/Enums';

const History = observer(() => {

  const appContext = React.useContext<AppData>(AppContext);

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
      <div>
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">№</th>
              <th scope="col">Наименование</th>
              <th scope="col">Формат</th>
              <th scope="col">Дата на изтегляне</th>
              <th scope="col"><span onClick={()=>appContext.clearAllHistory()} className="no-styled-btn">🗑</span></th>
            </tr>
          </thead>
          <tbody>
            {appContext.historyRecords.map((record, index) => {
              return (
                <tr key={record.youtubeResult.id.videoId}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.youtubeResult.snippet.title}</td>
                  <td>{record.downloadContentType  == MediaType.mp3 ? '🎵' : '🎬'}</td>
                  <td>{record.downloadedOn.toLocaleString()}</td>
                  <td><span className="no-styled-btn" onClick={()=>appContext.removeHistoryRecord(record)}>➖</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

export default History;

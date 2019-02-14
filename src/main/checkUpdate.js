import { app, autoUpdater, dialog } from "electron";

function confirmRestart(releaseNotes) {
  return new Promise((resolve, reject) => {
    // 다시 실행해도 괜찮은지 묻는 대화 상자 출력하기
    dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "The new version has been downloaded. Restart the application to apply the updates.",
      detail: releaseNotes,
      buttons: ["Restart", "Later"],
    }, function(response) {
      if (response === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function checkUpdate() {
  let feedURL;
  if (process.platform === "win32") {
    // 배포 통지 서버의 URL 설정(Windows의 경우)
    feedURL = `https://[your-app-release-server].herokuapp.com/update/win32/${app.getVersion()}`;
  } else if (process.platform === "darwin") {
    // 배포 통지 서버의 URL 설정(macOS의 경우)
    feedURL = `https://[your-app-release-server].herokuapp.com/update/darwin_${process.arch}/${app.getVersion()}`;
  }

  if (!feedURL) return;

  // 최신 버전 다운로드 완료 때의 처리
  autoUpdater.on("update-downloaded", (event, releaseNotes) => {
    confirmRestart(releaseNotes).then(() => {
      // 최신 버전 설치 후 다시 실행하기
      autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on("error", (e) => {
    console.error(e.message);
  });

  autoUpdater.setFeedURL(feedURL);
  autoUpdater.checkForUpdates();
}

export default checkUpdate;

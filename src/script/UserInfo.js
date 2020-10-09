import {api, userInfo, popupEdit} from './script'
export default class UserInfo {
    constructor(username, userJob) {
        this.username = username;
        this.userJob = userJob

    }

    setUserInfo(name,job) {
        this.username.textContent = name;
        this.userJob.textContent = job;
    }

    updateUserInfo() {
        event.preventDefault();
        api.updateUserInfo()
            .then(data => {
                userInfo.setUserInfo(data.name,data.about);
                popupEdit.close();
            })
            .catch(err => console.log(err));
    }
}


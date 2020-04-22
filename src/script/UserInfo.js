class UserInfo {
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
                console.log(data);
                userInfo.setUserInfo(data.name,data.about);
                popupEdit.close();
            })
            .catch(err => console.log(err));
    }
}

export default UserInfo
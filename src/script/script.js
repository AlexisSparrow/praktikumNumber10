import "../pages/index.css"
const root = document.querySelector('.root')
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const myId = 'cc13f2e6e980cc31a0218ebe';
const userAvatar = document.querySelector('.user-info__photo');
const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort9',
    headers: {
        authorization: '3da3f1f7-00db-4edd-b225-5b13ee20d1ea',
        ContentType: 'application/json'
    }
});

const userInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'));

const formValidatorEdit = new FormValidatorEdit(document.forms.edit,formEdit.elements.name,formEdit.elements.job);

const formValidatorAdd = new FormValidatorAdd(document.forms.add,formAdd.elements.name,formAdd.elements.link);

const formValidatorAvatar = new FormValidatorAvatar(document.forms.avatar,formAvatar.elements.link);

const cardList = new CardList(document.querySelector('.places-list'));

const popupAdd = new PopupAdd(document.querySelector('.popup__type_add'),formAdd.elements.name,formAdd.elements.link);

const popupPhoto = new PopupPhoto(document.querySelector('.popup__type_photo'));

const popupEdit = new PopupEdit(document.querySelector('.popup__type_edit'));

const popupAvatar = new PopupAvatar(document.querySelector('.popup__type_avatar'));

const valueOfEditChecker = () => { formEdit.elements.name.value = userName.textContent; formEdit.elements.job.value = userJob.textContent};

const openPopupAdd = () => { if (event.target.classList.contains('user-info__button')) popupAdd.open(); };

const openPopupEdit = () => { if (event.target.classList.contains('edit__button')) popupEdit.open(); }

const openPopupImage = () => { if (event.target.classList.contains('place-card__image')) { popupPhoto.open(); popupPhoto.imageInstaller(); } };

const openPopupAvatar = () => { if (event.target.classList.contains('user-info__opacity')) popupAvatar.open(); };

const openPopup = () => { openPopupAdd(); openPopupEdit(); openPopupImage(); openPopupAvatar(); };

root.addEventListener('click', openPopup)

api.getUserInfo()
    .then(data => {
        userName.textContent = data.name;
        userJob.textContent = data.about;
        userAvatar.style.backgroundImage = `url('${data.avatar}')`;
        valueOfEditChecker();
    })
    .catch(err => console.log(err));

/* REVIEW. Так как преобразованный метод getInitialCards будет возвращать промис (return fetch ... возвращает промис), ответ сервера
так же может обработаться в методе then:

api.getInitialCards()
  .then(data => cardList.addListCard(data))
  .catch(err => {
        console.log(err);
  });

По такому образцу надо преобразовать обработку ответов, возвращаемых каждым методом Api.
*/

api.getInitialCards()
    .then(data => cardList.addListCard(data))
    .catch(err => console.log(err));


/*REVIEW. Резюме.

Что надо исправить прежде всего (затем будет указано на другие, возможно имеющиеся, ошибки).

1. Нужно преобразовать структуру методов класса Api (подробности в модуле класса Api).

2. Производить обработку ответов, полученных от сервера по образцу, показанному на примере рендера карточек при загрузке страницы
(подробности в этом модуле чуть выше).

3. При загрузке страницы загружать с сервера и помещать в элемент страницы картинку аватара - это обязательное требование,
прочитайте внимательно описание задания.

4. Особое внимание обратить на запрос методом PATCH при сабмите формы профиля. Ответ, полученный от сервера в этом случае, также
должен обрабатываться (прочитайте внимательно пункт в описании задания 3. Редактирование профиля )

5. При удалении карточки в консоли появляется ошибка ReferenceError: cardArea is not defined. Сделайте удаление карточки, как
оно было сделано в задании 8, там у Вас карточка удалялась нормально.



REVIEW2. Резюме2.

Вы молодец, что сделали дополнительные задания проекта! Но, как и смысл жизни, профессионализм программиста - в мелочах, которые порой решают всё.

Во что нужно ещё вникнуть и исправить:

1. Как я уже писала после первой проверки, класс Api должен быть универсальным классом, то есть Вы должны написать его так, как-будто
собираетесь его использовать в нескольких разных проектах.
Поэтому, повторяю то, что я уже писала:  методы класса Api должны только делать запрос к серверу с данными, которые они получают в своих
параметрах, и получать ответ от сервера и возвращать его (или ошибку) в виде промиса. Обработка же возвращаемого промиса должна происходить вне модуля
класса Api - иначе как Вы будете класс Api использовать в других проектах - там, возможно, тот же ответ должен обрабатываться по-другому
и другими методами.

Поэтому ещё раз внимательно посмотрите на правильную структуру методов класса Api, которую я Вам дала в модуле класса Аpi, чтобы класс Аpi был
универсальным, она должна быть именно такой.
Обратите внимание на то, что очень важно и что Вы не сделали: первой инструкцией в любом методе класса Api должна быть инструкция return,
как раз эта инструкция и обеспечивает возврат из этого метода промиса, который и можно обработать в методе then, но уже в другом модуле
(не в модуле Api.js), то есть любой метод класса Api должен начинаться так:

methodApi() {
    return fetch(`...`, {
          .
          .
          .
Сделайте, пожалуйста, так.

2. Промис мы из методов Api возвращаем, теперь его нужно обрабртать - произвести с ним нужные действия, но, уже вне модуля Api.
Я Вам показала, как это сделать на примере рендера карточек при загрузке страницы.
То есть в script.js вместо Вашего кода api.getInitialCards() должно быть

api.getInitialCards()
  .then(data => cardList.addListCard(data))
  .catch(err => {
        console.log(err);
  });

При этом нужно помнить, что метод api.getInitialCards() должен быть преобразован по образцу, который я Вам дала в Api.js,
и ещё раз дала разъяснения по этому поводу в данном резюме.

Сделайте по такому же образцу и работу с методами Api getUserInfo и updateUserInfo.


3. Повторяю также пункт 4 из первого резюме: "Особое внимание обратить на запрос методом PATCH при сабмите формы профиля. Ответ, полученный
от сервера в этом случае, также должен обрабатываться (прочитайте внимательно пункт в описании задания 3. Редактирование профиля )".

Если в обработке ответа при этом запросе будут ошибки, придётся их подробную проработку оставить на следующую проверку, так как при текущей проверке
я вынуждена была повторить многое из того, что писала при первой проверке.



REVIEW3. Резюме3.

1. Надо исправить работу с сервером при сабмите формы профиля.

Смотрите комментарии по этому поводу в модуле класса UserInfo, затем в модуле класса PopupEdit, затем в модуле класса.

Хочу заметить, что студент лучше знает свой код и сам должен его отлаживать, поэтому прошу отнестись к моим рекомендациям творчески,
вникая в их смысл и в логику взаимодействия с сервером и самому оценить правильность работы своего приложения с сервером.


Будет лучше.

1. Будет лучше, если Вы вынесете из метода класса UserInfo updateUserInfo обращение к серверу, а также методы then и catch и будете весь этот
блок просто вызывать в слушателе сабмита формы профиля, и в методе then будете вызывать по порядку методы userInfo.setUserInfo,
userInfo.updateUserInfo и popupEdit.close(), учитывая комментарии по преобразованию их структуры. То есть, чтобы соблюсти принцип ООП единственной
ответственности класса, нужно в методе userInfo.updateUserInfo оставить только ответственность за обработку ответа от сервера, но не обращение к нему.


REVIEW4. Резюме4.

Критические ошибки по 9-му заданию исправлены.

Задание принято!

Будет профессиональнее, если Вы выполните рекомендацию из "Будет лучше".

Желаю дальнейших успехов в обучении!



*/


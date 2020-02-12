import { css } from "@emotion/core";

export default css`
  font-size: 2rem;
  padding: 0 20rem;
  .container{
	display: flex;
    justify-content: space-between; 
	flex-direction: row;
  }
  .tabs{
	  width:70%;
  }
  .infoCard{
	  width:30%;
	  border: 1px solid #ddd;
	  padding: 20px;
	  margin-left: 20px;
  }
  .calculatorWrapper {
    display: flex;
    justify-content: space-between;
    .loanForm {
      width: 100%;
    }
    @media (max-width: 689px) {
      flex-direction: column;
      .loanForm{
        width: 100%;
      }
    }
  }
  @media (max-width: 1041px) {
    padding: 0;
  }

  header h1 {
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 4rem;
  }
  
/* Стили секций с содержанием */
.tabs>section {
	display: none;
	padding: 15px;
	background: #fff;
	border: 1px solid #ddd;
}
.tabs>section>p {
	margin: 0 0 5px;
	line-height: 1.5;
	color: #383838;
	/* прикрутим анимацию */
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	-webkit-animation-name: fadeIn;
	animation-name: fadeIn;
}
/* Описываем анимацию свойства opacity */
 
@-webkit-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
/* Прячем чекбоксы */
.tabs>input {
	display: none;
	position: absolute;
}
/* Стили переключателей вкладок (табов) */
.tabs>label {
	display: inline-block;
	margin: 0 0 -1px;
	padding: 15px 25px;
	font-weight: 600;
	text-align: center;
	color: #aaa;
	border: 0px solid #ddd;
	border-width: 1px 1px 1px 1px;
	background: #f1f1f1;
	border-radius: 3px 3px 0 0;
}

/* Изменения стиля переключателей вкладок при наведении */
 
.tabs>label:hover {
	color: #888;
	cursor: pointer;
}
/* Стили для активной вкладки */
.tabs>input:checked+label {
	color: #555;
	border-top: 1px solid #009933;
	border-bottom: 1px solid #fff;
	background: #fff;
}
/* Активация секций с помощью псевдокласса :checked */
#tab1:checked~#content-tab1, #tab2:checked~#content-tab2, #tab3:checked~#content-tab3, #tab4:checked~#content-tab4 {
	display: block;
}
/* Убираем текст с переключателей 
* и оставляем иконки на малых экранах
*/
 

/* Изменяем внутренние отступы 
*  переключателей для малых экранов
*/
@media screen and (max-width: 400px) {
	.tabs>label {
		padding: 15px;
	}
}
`;

export const globalStyles = css`
  html {
    font-size: 62.5%;
    font-family: "Times New Roman", Georgia, Serif;
  }
`;

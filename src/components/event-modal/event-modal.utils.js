export const closeModal = () => {
    document.querySelectorAll(".events__modal")[0].style.height = "0";
    document.querySelectorAll(".events__modal")[0].style.transform = "scale(0)";
    document.querySelectorAll(".events__modal")[0].style.margin = "0px auto";
  };
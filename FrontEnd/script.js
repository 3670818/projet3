
let tousLesProjets;

fetch("http://localhost:5678/api/works").then(function (reponse) {
    reponse.json().then(function (projets) {
        tousLesProjets=projets;
        afficherProjets(projets);
     });
 });

 let gallery;

  function afficherProjets(projets) {
      console.log("PROJETS", projets);
     gallery = document.querySelector(".gallery");
     gallery.innerHTML="";







//     function displayGallery(projets) {
//         console.log("PROJETS", projets);
//         gallery = document.querySelector(".gallery");
//         gallery.innerHTML = "";
//         //show all works in array
//         projets.forEach((i) => {
//           //create tags
//           const workCard = document.createElement("figure");
//           const workImage = document.createElement("img");
//           const workTitle = document.createElement("figcaption");
//           workImage.src = i.imageUrl;
//           workImage.alt = i.title;
//           workTitle.innerText = i.title;
//           workCard.dataset.category = i.category.name;
//           workCard.className = "workCard";
//           //references to DOM
//           gallery.appendChild(workCard);
//           workCard.append(workImage, workTitle);
//         });
//       }
      
    
    
    
      projets.forEach(function (projet) {
       const sectionFiches = document.createElement("figure");
        //  sectionFiches.dataset.category = projet.category.name;
        //  sectionFiches.className = "sectionFiches";



         const imageElement = document.createElement("img");
          imageElement.src = projet.imageUrl;
        
        
          const article = document.createElement("figcaption");
          article.innerText = projet.title;
       
         
        
         
        
        
          sectionFiches.append(imageElement);
          sectionFiches.append(article);
          gallery.appendChild(sectionFiches);
        
        
      });
  };

window.onload=function(){

    const boutonFiltre = document.querySelector(".btn-Appart");

    boutonFiltre.addEventListener("click", function () {
    const projetAppart = tousLesProjets.filter(function (projet) {
       return projet.category.name === "Appartements";
    });
    afficherProjets(projetAppart)
    console.log(projetAppart)
    });




    const boutonFiltrer = document.querySelector(".btn-objet");

    boutonFiltrer.addEventListener("click", function () {
    const projetObjet = tousLesProjets.filter(function (projet) {
       return projet.category.name === "Objets";
    });
    afficherProjets(projetObjet)
    console.log(projetObjet)
    });



    const boutonFiltrer2 = document.querySelector(".btn-hotelEtRestaurant");

    boutonFiltrer2.addEventListener("click", function () {
    const projetHotelEtRestaurant= tousLesProjets.filter(function (projet) {
       return projet.category.name === "Hotels & restaurants";
    });
    afficherProjets(projetHotelEtRestaurant)
    console.log(projetHotelEtRestaurant)
    });


    const boutonFiltrer3 = document.querySelector(".btn-tous");

    boutonFiltrer3.addEventListener("click", function () {
    const projetTous= tousLesProjets
    afficherProjets(projetTous)
    console.log(projetTous)
    });






    //const boutonTous ttt = document.querySelectorall(".btn-tous");

   // boutonTous.addEventListener("click", function () {
    // const projetTousLesElements = tousLesProjets.filter(function (projet) {
    //    return projet.category.name === "Hotels & restaurants";
    // });
    // afficherProjets(projetHotelEtRestaurant)
    // console.log(projetHotelEtRestaurant)
    // });



};








// const boutonFiltrer = document.querySelector(".btn-objet");

// boutonFiltrer.addEventListener("click", function () {
//    const projetObjet = .filter(function (projet) {
//        return projet.name = Objets;
//    });
//   console.log(projetObjet)
//   });




// const boutonFiltrer = document.querySelector(".btn-hotelEtRestaurant");

// boutonFiltrer.addEventListener("click", function () {
//    const projetHotel = .filter(function (projet) {
//        return projet.name = Hotels & restaurants;
//    });
//   console.log(projetHotel)
//   });



let tousLesProjets;
let modal;

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


adminUserMode()

  




};


function adminUserMode() {
    const token = sessionStorage.getItem("token");
    const estConnecte =token !==null;
    if(estConnecte) {
        //afficher le bandeu mode edition
        document.body.classList.add("estConnecte")
    
    // const boutonFiltre = document.querySelector(".ban");

    // boutonFiltre.addEventListener("click", function () {
    // const projetAppart = tousLesProjets.filter(function (projet) {
    //    return projet.category.name === "Appartements";
    // });
    // afficherProjets(projetAppart)
    // console.log(projetAppart)
    // });

   







    //     //cacher les filtres
        document.querySelector(".btn-objet").remove()
        document.querySelector(".btn-Appart").style.display = "none";
        document.querySelector(".btn-hotelEtRestaurant").style.display = "none";
        document.querySelector(".btn-tous").style.display = "none";



       //ajouter le bouton modifier
        const boutonModifier = document.createElement("div");
        boutonModifier.classList.add("btn-modifier");
        boutonModifier.innerText = "Modifier";
        document.body.append(boutonModifier);


    
        boutonModifier.addEventListener("click", ()=>{
        
            const fondPopup = document.createElement("div");
            fondPopup.classList.add("fondPopup");
        // mettre les images
        // const contentPopup = document.createElement("div");
        // contentPopup.classList.add("content")
    
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.innerHTML = `
                <div class="boutonFermer">X</div>
                <h2>Galerie photo</h2>
                <div class="galeryModal"> </div> 
                <button >Toutes les photos </button>
            
           
             
        `;
        fondPopup.append(popup)
        document.body.append(fondPopup);
        const galleryModal= popup.querySelector(".galleryModal");
       
        tousLesProjets.forEach(function(projet){
            console.log(projets);
            //créer une div
            const divContenentlesImages = document.createElement("div");
            divContenentlesImages.innerHTML=""  
                
            //A l'intérieur, on met l'image correspondant au projet
            const imageElement2 = document.createElement("img");
            imageElement2.src = projet.imageUrl;
            

            divContenentlesImages.append(imageElement);

                
                //Puis un bouton pour supprimer le projet
                //Et on ajoute la div dans galleryModale
        });


    

        // 


        // const imageElement = document.createElement("img");
        // imageElement.src = projet.imageUrl;
        
    
    
        popup.querySelector(".boutonFermer").addEventListener("click", function() {
            fondPopup.remove();
         });
    

        //  contentPopup=popup.querySelector("cont")

        const boutonAjout = document.createElement("div");
        boutonAjout.classList.add("btn-ajt");
        boutonAjout.innerText = "Ajouter";
        popup.append(boutonAjout);


    
        boutonAjout.addEventListener("click", ()=>{

            const fondPopup = document.createElement("div");
            fondPopup.classList.add("fondPopup");
    
            const popup2 = document.createElement("div");
            popup2.classList.add("popup2");
            popup.innerHTML = "";
    
            fondPopup.append(popup2);
    
        
        })
    })

}
}






    
    
    
    
    
    
//   






    // function displayGallery(projet) {
    //     console.log("PROJETS", projets);
    //     gallery = document.querySelector(".gallery");
    //     gallery.innerHTML="";
    //     gallery = document.querySelector(".gallery");
    //     gallery.innerHTML = "";
    //     //show all works in array
    //     projet.forEach((i) => {
    //       //create tags
          
    //       const workImage = document.createElement("img");
          
    //       workImage.src = i.imageUrl;
        
    //       workCard.dataset.category = i.category.name;
    //       workCard.className = "workCard";
    //       //references to DOM
    //       gallery.appendChild(workCard);
    //       workCard.append(workImage, workTitle);
    //     });
    //   }



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

















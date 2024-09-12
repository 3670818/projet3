
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
    
    

    // const deleteMethod = {
    //     method: 'DELETE', // Method itself
    //     headers: {
    //      'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    //     },
    //     // No need to have body, because we don't send nothing to the server.
    //    }
    //    // Make the HTTP Delete call using fetch api





    //    fetch("http://localhost:5678/api/works", deleteMethod) 
    //    .then(response => response.json())
    //    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    //    .catch(err => console.log(err)) // Do something with the error



    //    function deleteData(item, url) {
    //     return fetch(url + '/' + item, {
    //       method: 'delete'
    //     })
    //     .then(response => response.json());
    //   }













    
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
                <h3>Galerie photo</h3>
                <div class="galleryModal"> </div> 
                
                
        
             
        `;
        fondPopup.append(popup)
        document.body.append(fondPopup);
        let galeryModal
        const galleryModal= popup.querySelector(".galleryModal");
        
       
    
           
            tousLesProjets.forEach(function(projet) {
                // Créer un élément figure
                const figureModal = document.createElement("figure");
               
            
                // Définir le contenu HTML de la figure avec une image et une légende
                figureModal.innerHTML = `
                  <div class="image-container">
                 <img src="${projet.imageUrl}" alt="${projet.title}">
                
                 <i id=${projet.id} class="fa-solid fa-trash-can delete-icon"></i>
                    </div>
    

                    
                `;
            
                // Sélectionner l'élément dans lequel vous voulez ajouter la figure
                const galleryModal = document.querySelector(".galleryModal"); // Assurez-vous que ".galleryModal" est un sélecteur valide
            
                // Ajouter la figure dans la galleryModal
                if (galleryModal) {
                    galleryModal.append(figureModal);
                } else {
                    console.error("galleryModal non trouvée");
                }
            
                // Vous pouvez ajouter ici le bouton de suppression si nécessaire
                trashCan= document.querySelectorAll(".fa-trash-can");
                console.log(trashCan);
                trashCan.forEach((e) => 
                    e.addEventListener('click',(event)=>deleteWork(event)));

                  
               

            });
            


           

        // 


        // const imageElement = document.createElement("img");
        // imageElement.src = projet.imageUrl;
        
    
    
        popup.querySelector(".boutonFermer").addEventListener("click", function() {
            fondPopup.remove();
         });
        
    
    



        // //ajouter le bouton modifier
    // const boutonModifier = document.createElement("div");
    // boutonModifier.classList.add("btn-modifier");
    // boutonModifier.innerText = "Modifier";
    // document.body.append(boutonModifier);
        //ajouter le boutton ajout
  
            
            
    
         
    // `;



         const boutonAjout = document.createElement("div");
         boutonAjout.classList.add("btn-ajt");
          boutonAjout.innerText = "Ajouter";
          popup.append(boutonAjout);


          boutonAjout.addEventListener("click", ()=>{
            popup.remove();

         const popup2 = document.createElement("div");
         popup2.classList.add("popup2");
         popup2.innerHTML = `
         <div class="boutonFermer">X</div>`
               
    
            // fondPopup2.append(popup2);
            // popup2.querySelector(".boutonFermer").addEventListener("click", function() {
            //     fondPopup2.remove();
            //  });


    
        
        })
    })
// }
// }



  
 // document.addEventListener('click',function(event){
                //     if (event.target.classList.contains('fa-trash-icon')){
                //         console.log('hello');
                //     }
                // });
                
                //     a.addEventListener("click",deleteWork)
                    
                    
                    
                  async function deleteWork(event) {
                        //deletwork 
                 const deleteApi="http://localhost:5678/api/works/";
                console.log(event.srcElement.id)
                const id=event.srcElement.id



                fetch(deleteApi+`http://localhost:5678/api/works${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
               
                    
            
                    }).then((response) => {
                      if (response.status !== 200) {
                        alert("Problème détecté");
                      } else {
                        // response.json().then((data) => {
                        //   sessionStorage.setItem("token", data.token); //STORE TOKEN
                        //  let resultat = await response.json();
                        //  console.log(resultat)
                        // // });
                      }
                    });
                   };


                }}
 
// })





//   function deleteWork(id){
  
// }



    
// deleteButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Supprimer la figure (image et légende) associée au bouton cliqué
//         const figure = this.parentElement; // `this` fait référence au bouton, et `parentElement` à la figure
//         figure.remove();
//     });
// })
    
    
    
    
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

















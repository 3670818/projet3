
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
                <button class="btn-ajouter-une-photo">ajouter une photo</button>

                

                
        
             
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
                trashCan= figureModal.querySelector(".fa-trash-can");
                console.log(trashCan);
                
                    trashCan.addEventListener('click',(event)=>deleteWork(event));

                  
               

            });
            


           

        // 


        // const imageElement = document.createElement("img");
        // imageElement.src = projet.imageUrl;
        
    
    
        popup.querySelector(".boutonFermer").addEventListener("click", function() {
            fondPopup.remove();
         });
        
    
    



    //     //ajouter le bouton modifier
    // const boutonModifier = document.createElement("div");
    // boutonModifier.classList.add("btn-modifier");
    // boutonModifier.innerText = "Modifier";
    // document.body.append(boutonModifier);
        //ajouter le boutton ajout
  
            
            
    
    //        
            // Gestion de l'ouverture de la deuxième popup
            popup.querySelector(".btn-ajouter-une-photo").addEventListener("click", function() {
                popup.remove();
                openSecondPopup(fondPopup); // Passer l'overlay de la première popup à la fonction
            });
        });

        // Fonction pour ouvrir la deuxième popup
        function openSecondPopup(fondPopup) {
            const popup2 = document.createElement("div");
            popup2.classList.add("popup2");
            popup2.innerHTML = `
                <div class="boutonFermer">X</div>
              <!-- <div class="modalHeader"><i class="fa-solid fa-arrow-left"></i><i class="fa-solid fa-xmark"></i></div>-->
			<h3 class="title">Ajout photo</h3>
            <div class="portion-bleu-de-la-page">
		        <div class="modalContent">
                    <i class="fa-regular fa-image picture"></i>
                    <label for="file" class="ajouter-une-photo">Ajouter une photo</label>
                    <input type="file" id="file" name="file" accept="image/png, image/jpeg" required>
                    <p class="texte-jpg-png">jpg, png : 4mo max</p>
                    <img id="imagePreview" src="#" alt="Aperçu de l'image" />
                </div>
            </div>
				
		   <section id="contact">
		    <form method="post">
			<label for="titre">Titre</label>
			<input type="text" id="titre" name="titre" placeholder="Tapez votre titre ici" required>

			
            <label for="categorie">Catégorie</label>
			<!-- <input type="categorie" name="Catégorie" id="category"> -->

    <input list="options" id="category" name="categorie" placeholder="sélectionnez" required>
    
    <datalist id="options" >
        <option value="1">Appartement</option>
        <option value="2">Objet</option>
        <option value="3">hotel et Restaurant</option>
    </datalist>
			
            <button class="btn-valider-la-photo">Valider</button>
		</form>
	</section>
            `;
            fondPopup.append(popup2);

            // Gestion de la fermeture de la deuxième popup
            popup2.querySelector(".boutonFermer").addEventListener("click", function() {
                fondPopup.remove(); // Supprimer seulement la deuxième popup
            });

            popup2.querySelector(".ajouter-une-photo").addEventListener("click", function() {
               console.log("hello world")
             });
              // Référence à l'input de fichier et l'image de prévisualisation
              const fileInput = document.getElementById('file');
              const modalContent = document.querySelector('.modalContent');
      
              // Écouteur d'événement pour détecter le changement de fichier
              fileInput.addEventListener('change', function postNewWork(event) {
                  const file = event.target.files[0];  // Récupère le fichier sélectionné
      
                  if (file) {
                      const reader = new FileReader();  // Crée un FileReader pour lire le fichier
      
                      // Lorsque le fichier est chargé
                      reader.onload = function(e) {
                          // Crée une nouvelle balise <img>
                          const image = document.createElement('img');
                          image.src = e.target.result;  // Définit l'URL de l'image
                          image.style.width = '37%';  // Rend l'image responsive
                          image.style.height = 'auto';  // Préserve le ratio de l'image
      
                          // Remplace le contenu de .modalContent par l'image
                          modalContent.innerHTML = '';
                          modalContent.appendChild(image);
                      };
      
                      reader.readAsDataURL(file);  // Lit le fichier comme une URL de données (data URL)
                  }
              });

            //   const formProjet= new FormData
              popup2.querySelector(".btn-valider-la-photo").addEventListener("click", function() {
                console.log("hello world")
              popup2.querySelector(".btn-valider-la-photo").addEventListener('click',(event)=>handleSumit(event));
              });
        }
        }



        //  const boutonAjout = document.createElement("div");
        //  boutonAjout.classList.add("btn-ajt");
        //   boutonAjout.innerText = "Ajouter";
        //   popup.append(boutonAjout);



        //   boutonAjout.addEventListener("click", ()=>{

            
            


            // const popup = document.createElement("div");
            
            
            // popup2.classList.add("popup2");
            // popup2.innerHTML = `
            // <div class="boutonFermer">X</div>
            // <h3>Galerie photo</h3>
            // <div class="galleryModal"> </div> `
               
    
            // fondPopup2.append(popup2);
            // popup2.querySelector(".boutonFermer").addEventListener("click", function() {
            //     fondPopup2.remove();
            //  });


    
        
       }
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



                fetch(deleteApi+id, {
                    method: "DELETE",
                    //token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4;
                    headers: {
                        "Authorization": "Bearer " + token
                    }
               
                    }).then((response) => {
                      if (response.status !== 204) {
                        alert("Problème détecté");
                      } else {
                        //Mettre à jour le tableau tousLesProjets pour enlever celui qu'on vient de supprimer
                        tousLesProjets = tousLesProjets.filter(function(projet) {
                            return projet.id !== Number(id);
                        });
                        //On appelle la fonction afficher projets pour mettre à jour les projets sur la page d'accueil
                        afficherProjets(tousLesProjets);
                        //On fait pareil pour la liste de projets dans la modale
                        document.querySelector(".fondPopup").remove();
                        document.querySelector(".btn-ajouter-une-photo").click();
                      }
                    });
                   };


                   //API call for new work
                async function handleSumit(event) {
                // event.preventDefault();
                const formProjet= new formProjet()
            
                let token = sessionStorage.getItem("token");
                const select = document.getElementById("selectCategory");
                //get data from form
                const titlePopup = document.getElementById("title").innerText;
                const imagePopup = document.getElementById("imagePreview").files[0];
                // const categoryNamePopup= select.options[select.selectedIndex]
                // const categoryId = 
            

                formProjet.append("image",imagePopup)
                formProjet.append("title",titlePopup)
                // formProjet.append("category",title)

                const postApi="http://localhost:5678/api/works";

                fetch(postApi, {
                  method: "POST",
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    //  "Content-Type: multipart/form-data"

                  },
                  body: formProjet,
                })
                  .then((response) => {
                    if (response.status !== 204) {
                        alert("Problème détecté");
                      } else {
                        //Mettre à jour le tableau tousLesProjets pour enlever celui qu'on vient de supprimer
                        tousLesProjets = tousLesProjets.filter(function(projet) {
                            return projet.id !== Number(id);
                        });
                        //On appelle la fonction afficher projets pour mettre à jour les projets sur la page d'accueil
                        afficherProjets(tousLesProjets);
                        //On fait pareil pour la liste de projets dans la modale
                        document.querySelector(".fondPopup").remove();
                        document.querySelector(".btn-ajouter-une-photo").click();
              }})
            }






                   

                  



















            //        async function postNewWork(event) {
            //         //deletwork 
            //  const postApi="http://localhost:5678/api/works/";
            // console.log(event.srcElement.id)
            // const id=event.srcElement.id



            // fetch(postApi+id, {
            //     method: "POST",
            //     //token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4;
            //     headers: {
            //         "Authorization": "Bearer " + token
            //     }
           
            //     }).then((response) => {
            //       if (response.status !== 204) {
            //         alert("Problème détecté");
            //       } else {
            //         //Mettre à jour le tableau tousLesProjets pour enlever celui qu'on vient de supprimer
            //         tousLesProjets = tousLesProjets.filter(function(projet) {
            //             return projet.id !== Number(id);
            //         });
            //         //On appelle la fonction afficher projets pour mettre à jour les projets sur la page d'accueil
            //         afficherProjets(tousLesProjets);
            //         //On fait pareil pour la liste de projets dans la modale
            //         document.querySelector(".fondPopup").remove();
            //         document.querySelector(".btn-ajouter-une-photo").click();
            //       }
            //     });
            //    };

            // const addToWorksprojet = function(projet, categoryName) {
            //     newWork = {};
            //     newWork.title = projet.title;
            //     newWork.id = projet.id;
            //     newWork.category = {"id" : projet.categoryId, "name" : categoryName};
            //     newWork.imageUrl = projet.imageUrl;
            //     worksprojet.push(newWork);
            //   }
              
              


                //    const switchmodal= function(){
                //     document.querySelector(".popup").innerHTML='';
                //    };

                //    const addbouton= document.querySelector(".btn-ajt");
                //    addbouton.addEventListener("click",switchmodal);



                



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

















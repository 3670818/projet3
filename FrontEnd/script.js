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
adminUserMode()
};


function adminUserMode() {
    
    
    
    const token = sessionStorage.getItem("token");
    const estConnecte =token !==null;
    if(estConnecte) {
        //afficher le bandeu mode edition
        document.body.classList.add("estConnecte")

    //     //cacher les filtres
        document.querySelector(".btn-objet").remove()
        document.querySelector(".btn-Appart").style.display = "none";
        document.querySelector(".btn-hotelEtRestaurant").style.display = "none";
        document.querySelector(".btn-tous").style.display = "none";
       //ajouter le bouton modifier
       const boutonFiltre = document.querySelector(".btn-Appart");
        const boutonModifier = document.querySelector(".partieModifierPresDuTitre");
        boutonModifier.addEventListener("click", ()=>{
            const fondPopup = document.createElement("div");
            fondPopup.classList.add("fondPopup");
        // mettre les images
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.innerHTML = `
                <div class="boutonFermer">X</div>
                <h3 class= "titre-galerie">Galerie photo</h3>
                <div class="galleryModal"> </div> 
                <hr>
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
            popup.querySelector(".boutonFermer").addEventListener("click", function() {
            fondPopup.remove();
         });
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

   
    
   <select id="categorie" name="categorie" placeholder="Sélectionner catégorie" required>
                <option value="1">Appartement</option>
                <option value="2">Objet</option>
                <option value="3">hotel et Restaurant</option>
            </select>
            
			
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
                          // Remplace le contenu de .modalContent par l'image
                          modalContent.classList.add("preview");
                          modalContent.appendChild(image);
                      };
      
                      reader.readAsDataURL(file);  // Lit le fichier comme une URL de données (data URL)
                  }
              });

            
             
            popup2.querySelector(".btn-valider-la-photo").addEventListener('click',(event)=>handleSumit(event));
              };
              
        }
        }         
                  async function deleteWork(event) {
                 const deleteApi="http://localhost:5678/api/works/";
                console.log(event.srcElement.id)
                const id=event.srcElement.id
                let token = sessionStorage.getItem("token");
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
                        // document.querySelector(".btn-ajouter-une-photo").click();
                        // voir si c'est utile
                      }
                    });
                   };


                   //API call for new work
                   async function handleSumit(event) {
                    event.preventDefault();
                    
                    const formProjet = new FormData();
                    let token = sessionStorage.getItem("token");
                    const categorie = document.getElementById("categorie").value;
                    const titlePopup = document.getElementById("titre").value;
                    const imagePopup = document.getElementById("file").files[0];
                  
                    formProjet.append("image", imagePopup); // le nom du fichier sera pris automatiquement
                    formProjet.append("title", titlePopup);
                    formProjet.append("category", categorie);
                  
                    const postApi = "http://localhost:5678/api/works";
                  
                    try {
                      const response = await fetch(postApi, {
                        method: "POST",
                        headers: {
                          authorization: `Bearer ${token}`,
                          // Ne pas spécifier Content-Type, le navigateur le gère automatiquement avec FormData
                        },
                        body: formProjet,
                      });
                  
                      if (response.status !== 201) {
                        alert("Problème détecté : " + response.status);
                      } else {
                        const newProject = await response.json(); // Récupérer la réponse JSON avec le nouveau projet
                        tousLesProjets.push(newProject); // Ajouter le nouveau projet au tableau existant
                  
                        console.log("Projet ajouté avec succès !");
                        
                        // Mettre à jour l'affichage des projets
                        afficherProjets(tousLesProjets);
                  
                        // Fermer la modale et réinitialiser les champs
                        document.querySelector(".fondPopup").remove();
                        document.querySelector(".btn-ajouter-une-photo").click();
                      }
                    } catch (error) {
                      console.error("Erreur lors de l'ajout du projet :", error);
                    }
                  }
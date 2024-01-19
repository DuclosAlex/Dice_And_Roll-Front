# Dice & Roll Front-end

## Présentation 

Le but de ce projet est d'expérimenter en reproduisant le projet de fin de formation réalisé lors de ma formation chez O'clock. En équipe de 5  à l'époque, nous avons construit une plateforme permettant aux joueurs de JDR ( Jeux de Rôle ) de se retrouver pour participer à des parties en ligne. 

Les utilisateurs doivent pouvoir s'inscrire, créer des parties ( salon où se retrouvent les joueurs), gérer les fiches de leurs personnages, jouer les parties, accèder à un blog, etc... 

Pour le projet originel, j'ai principalement travaillé sur le back-end (https://github.com/DuclosAlex/MyAmiDice_BACK), et particulièrement sur les scripts SQL et sur l'application express avec la création de coreController et coreModel qui ont été transmis à tous les controlleurs et models. J'ai aussi travaillé sur les fonctions SQL et aidés au CSS à la fin du dernier sprint. 

Cette fois-ci il s'agit de tout faire seul, en utilisant Next.js pour le front ( la doc officielle de React le recommandant ), afin de maîtriser ce framework, tout en améliorant la partie du back-end que j'ai repris. 

Les principales nouveautés seront de construire tout le front en utilisant tailwind et de géré l'authentification côté front. Et pour le back, je devrais travailler à l'optimisation de ce qui existe déjà, à inclure l'ajout d'image par les utilisateurs en BDD, à gérér l'authentification et la sécurité, ainsi qu'à mettre en place le serveur webSocket pour les interactions en direct comme le chat lors des parties. 
# Psql et SQL

## Psql

Psql c'est un client PostgreSQL qui va nous permettre de communiquer avec le serveur où est située la base de donnée.

Comment se connecter à une base de donné (BDD) ?

```bash
psql -h <host> -U <user> -d <nom_bdd>
psql -h pg.oclock.lan -U etudiant -d trombi
```

-h : host (nom de domaine)  
-U : nom d'utilisateur  
-d : base de donnée (bdd / database)  

Se connecter en tant que superutilisateur postgres en local :  
*le -h localhost n'est pas obligatoire (il le met par défaut)*

```bash
psql -h localhost -U postgres -d trombi
```

Executer un fichier SQL :

```bash
psql -U postgres -f ./data/create_db.sql
```

### Commandes psql

* **\q** : quitter le prompt psql  
* **\dt** : voir les tables de la base de donnée  
* **\l** : voir la liste des bases de données du serveur  
* **\d nom_table** : voir la structure de la table (les champs)  
* **\c nom_base** : changer de base de donnée

## SQL

### DML Data Manipulation Langage

**CRUD : CREATE - READ - UPDATE - DELETE**

#### SELECT (READ)

Récupérer toutes les données (enregistrements) d'une table :
```sql
SELECT * FROM promo;
```

**SELECT** : Récupération (lecture)  
**FROM nom_table** : Sélection de la table  
**\*** : tout

Récupérer les données (enregistrements) d'une table (seulement les champs nécessaires) :

```sql
SELECT "<nom_champ>", "<nom_champ2>",... FROM "<nom_table>";
SELECT "id", "name" FROM "promo";
```

Récupérer tous les étudiants de la promo 216 :
```sql
SELECT * FROM "student" WHERE "promo_id"=216;
```

Récupérer les noms / prénoms des étudiants triés par ordre alphabétique :

```sql
SELECT * FROM "student" ORDER BY "last_name";
```

Même chose mais par ordre décroissant :

```sql
SELECT * FROM "student" ORDER BY "last_name" DESC;
```

Récupérer les noms / prénoms des étudiants de la promo 216 (Nautilus) et qui s'appellent Kevin :

```sql
SELECT * FROM "student" WHERE "promo_id"=216 AND "first_name"='Kevin';
```

**⚠ SENSIBLE A LA CASSE (MINUSCULES / MAJUSCULES) ⚠**

Récupérer les noms / prénoms des étudiants de la promo 216 (Nautilus) ou de la promo 213 :

```sql
SELECT * FROM "student" WHERE "promo_id"=216 OR "promo_id"=213;
```

Récupérer toutes les promos qui commencent par la lettre N :

```sql
SELECT * FROM "promo" WHERE "name" LIKE 'N%';
```

Compter le nombre d'étudiants (et les enregistrer en tant que "nb_students) (alias):

```sql
SELECT COUNT(*) AS "nb_students" FROM "student";
```

Compter le nombre d'étudiants par promos :

```sql
SELECT "promo_id", COUNT(*) FROM "student" GROUP BY "promo_id";
```

Sélectionner les X premiÈres promos :

```sql
SELECT * FROM "promo" LIMIT X;
```

Sélectionner les X premiÈres promos À partir du Y ÉlÉment:

```sql
SELECT * FROM "promo" LIMIT X OFFSET Y;
```

Jointure avec **WHERE** (rÉcupÈre les donnÉes de deux ou plusieurs tables):

```sql 
SELECT * FROM <table1>, <table2> WHERE table1.id = table2.truc_id;
SELECT * FROM promo, student WHERE promo.id = student.promo_id AND promo.name = 'Nautilus';
```

Jointure avec **JOIN ON** (rÉcupÈre les donnÉes de deux ou plusieurs tables) :

```sql
SELECT * FROM <table1> JOIN <table2> ON table1.id = table2.id_truc
SELECT * FROM promo JOIN student ON promo.id = student.promo_id WHERE promo.name = 'Nautilus';

 ```


#### INSERT (CREATE)

Insérer des données dans la table promo :
(On peut insérer plusieurs enregistrements en même temps)

```sql
INSERT INTO "promo" VALUES(5555, 'Redingote', 'truc'),
(5556, 'Machin', 'truc');
```

#### UPDATE (UPDATE)

Mettre à jour les données d'une table :

```sql
UPDATE "<nom_table>" SET "<nom_champ>"='<valeur>' WHERE "<champ>"=<valeur>
UPDATE "promo" SET "name"='Fourchette' WHERE "id"=216;
```

#### DELETE (DELETE)

Supprimer des données d'une table :

```sql
DELETE FROM "<nom_table>" WHERE "<nom_champ>"='<valeur>';
DELETE FROM "student" WHERE "promo_id"=213; 
```


### DDL Data Definition Langage

Créer un utilisateur postgres :

```sql
CREATE ROLE <nom> WITH LOGIN PASSWORD '<pass>';
CREATE ROLE trombi WITH LOGIN PASSWORD 'trombi';
```

Créer une base de donnée liée au nouvel utilisateur :

```sql
CREATE DATABASE <nom> OWNER '<nom_proprio>';
CREATE DATABASE trombi OWNER 'trombi';
```

Supprimer une table : 

```sql
DROP TABLE IF EXISTS "<nom_table>";
DROP TABLE IF EXISTS "promo";
```

Vider une table : (plus optimisé que DELETE pour tout supprimer)

```sql
TRUNCATE TABLE "<nom_table>";
TRUNCATE TABLE "promo";
```

Créer une table :

```sql
CREATE TABLE IF NOT EXISTS "promo" (
  "id" INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(128),
  "github_organization" VARCHAR(255)
);
```

**INT** : Type numérique (entier)   
**VARCHAR(X)** : Texte limité à X caractères (jusqu'à 255)  
**SERIAL** : Type numérique qui s'auto-incrémente  

**PRIMARY KEY** : Clef primaire => identifiant unique

Créer une table avec une clef étrangère :

```sql
CREATE TABLE IF NOT EXISTS "student" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(128),
  "last_name" VARCHAR(128),
  "github_username" VARCHAR(255),
  "profile_picture_url" VARCHAR(255),
  "promo_id" INT REFERENCES "promo"("id")
);
```

**REFERENCES "nom_table"("nom_champ")** : Clef étrangère => Ce qui fait la liaison avec une autre table

Renommer un champ d'une table :

```sql
ALTER TABLE "<nom_table>" RENAME "<nom_champ>" TO "<nouveau_nom>";
ALTER TABLE "student" RENAME "github_organization" TO "github";
```

Ajouter un champ dans une table :

```sql
ALTER TABLE "<nom_table>" ADD "<nom_champ>" <nom_type>;
ALTER TABLE "student" ADD "front_controller" BOOLEAN;
```

Mettre une valeur par defaut :

```sql
ALTER TABLE "<nom_table>" ALTER COLUMN "<nom_champ>" SET DEFAULT <valeur>;
ALTER TABLE "student" ALTER COLUMN "front_controller" SET DEFAULT false;
```
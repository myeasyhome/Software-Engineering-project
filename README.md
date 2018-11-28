Graduate Recruitment system
---

# Project Description
GradRec is a system that advertises projects for Masters/PhD positions, information on their research projects and the availability of financial aid for the given project. It also specifies the skills and background required for the applicants to work on a given project.

Additionally, prospective students can register and create a profile where they provide their academic information, research interests, work experience, intended start date and the need for financial support.

With both the project definition and the prospective students’ information, the GradRec system will match the suitable candidates, defined by their skills and backgrounds, to the research projects. When a student is matched to a project, he/she will be able to communicate with the project manager. After an evaluation of the prospective student, the project manager can offer admission to the candidate. 

Once the student receives the offer, he can accept or decline it on the system. If the user accepts the offer, he will be able to track his performance in the program within the system, this is his grades and the project’s progress.

#  Usage

 **Checkout and Run：**

   > First, you need to install [Mongodb](http://www.mongodb.org/)，and [Nodejs](http://nodejs.org/ "Nodejs") on your computer.

 **1 Clone code**

  >  `git clone https://github.com/COMP6905-SOFTWARE-ENGINEERING/Software-Engineering-project.git`


 **2 Install**

 >  `npm install`



**3 Run Mongo server**

 >   mongod

 **4 Install Catalogs**

>   mongoimport --db GradRecDB --collection universities --file commands/universities.json

>   mongoimport --db GradRecDB --collection countries --file commands/countries.json

>   mongoimport --db GradRecDB --collection programs --file commands/programs.json

 **5 Run app**

```
 $ node app.js
 ```


### hint: you can use eclipse or [WebStorm](https://www.jetbrains.com/webstorm/) to boost your developing efficiency.





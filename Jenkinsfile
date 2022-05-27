pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                dir("proj"){
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir("proj"){
                    sh "npm install bcrypt"
                    sh "chmod +x -R ${env.WORKSPACE}"
                    sh "npm test"
                }
                
            }
        }
        stage('Deliver') {
            steps {
                sh 'pwd'
            }
        }
    }
}
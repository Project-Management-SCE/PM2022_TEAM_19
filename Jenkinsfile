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
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh "chmod +x -R ${env.WORKSPACE}"
                sh "cd proj"
                sh "npm test"

            }
        }
        stage('Deliver') {
            steps {
                sh 'pwd'
            }
        }
    }
}
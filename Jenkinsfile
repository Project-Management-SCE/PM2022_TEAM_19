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

        stage('Coverage') {
            steps {
                dir("proj"){
                    sh 'npx nyc report --tset=lcov '
                }
            }

        }
               stage('Quality') {
                    steps {
                        dir("proj"){
                            sh 'npm install eslint-plugin-react@latest --save-dev'
                            sh 'npx eslint test.js'
                        }
                    }

                }
    }
}

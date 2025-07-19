pipeline {

    agent any

    environment {
        GIT_CRED_ID = 'git-access-token'
        GIT_REPO = 'https://github.com/gkundu091000/notes-app.git'
        GIT_BRANCH = 'main'
        DOCKER_CRED_ID = 'docker-access-token'
        IMAGE_NAME = 'gkundu091000/notes-app:latest'
    }

    stages {
        stage('Cloning Git Project') {
            steps {
                git credentialsId: "${GIT_CRED_ID}", url: "${GIT_REPO}", branch: "${GIT_BRANCH}"
            }
        }

        stage('Building Docker Image') {
            steps {
                sh "docker build -t notes-app:latest ."
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CRED_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Pushing Image') {
            steps {
                sh "docker tag notes-app:latest $IMAGE_NAME"
                sh "docker push $IMAGE_NAME"
            }
        }
    }
}


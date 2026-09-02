pipeline {
    agent any

    stages {
        stage('Backend Build') {
            steps {
                dir('backend/marketplace-backend') {
                    sh 'chmod +x mvnw'
                    sh './mvnw -B -DskipTests clean package'
                }
            }
        }
        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }
    }
}

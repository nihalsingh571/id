pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'nginx:latest'
        CONTAINER_NAME = 'my-nginx-container'
        GITHUB_REPO = 'https://github.com/nihalsingh571/id.git'
    }
    
    stages {
        stage('Test Docker') {
            steps {
                bat 'docker --version'
                bat 'docker info'
            }
        }

        stage('Clone Code') {
            steps {
                // Clone the repository
                git url: "${GITHUB_REPO}", branch: 'main'
            }
        }
        
        stage('Run Shell Scripts in Parallel') {
            parallel {
                stage('Script 1') {
                    steps {
                        bat '''
                            echo "Running first script"
                            .\\script1.sh
                        '''
                    }
                }
                stage('Script 2') {
                    steps {
                        bat '''
                            echo "Running second script"
                            .\\script2.sh
                        '''
                    }
                }
            }
        }
        
        stage('Print Working Directory') {
            steps {
                bat 'dir'
            }
        }
        
        stage('Print Environment Variables') {
            steps {
                bat '''
                    echo Current working directory: %CD%
                    echo Jenkins workspace: %WORKSPACE%
                    echo Build number: %BUILD_NUMBER%
                    echo Job name: %JOB_NAME%
                    echo GitHub repository: %GITHUB_REPO%
                '''
            }
        }
        
        stage('Docker Operations') {
            steps {
                script {
                    try {
                        bat '''
                            docker pull %DOCKER_IMAGE%
                            docker run -d --name %CONTAINER_NAME% -p 8082:80 %DOCKER_IMAGE%
                            docker ps | findstr %CONTAINER_NAME%
                        '''
                    } catch (Exception e) {
                        echo "Error in Docker operations: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error("Docker operation failed")
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup Docker container
            bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
            '''
        }
    }
} 
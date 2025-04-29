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
                sh 'docker --version'
                sh 'docker info'
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
                        sh '''
                            echo "Running first script"
                            ./script1.sh
                        '''
                    }
                }
                stage('Script 2') {
                    steps {
                        sh '''
                            echo "Running second script"
                            ./script2.sh
                        '''
                    }
                }
            }
        }
        
        stage('Print Working Directory') {
            steps {
                sh 'ls -la'
            }
        }
        
        stage('Print Environment Variables') {
            steps {
                sh '''
                    echo "Current working directory: $PWD"
                    echo "Jenkins workspace: $WORKSPACE"
                    echo "Build number: $BUILD_NUMBER"
                    echo "Job name: $JOB_NAME"
                    echo "GitHub repository: ${GITHUB_REPO}"
                '''
            }
        }
        
        stage('Docker Operations') {
            steps {
                script {
                    try {
                        sh '''
                            # Pull Docker image
                            docker pull ${DOCKER_IMAGE}
                            
                            # Run container
                            docker run -d --name ${CONTAINER_NAME} -p 8082:80 ${DOCKER_IMAGE}
                            
                            # Verify container is running
                            docker ps | grep ${CONTAINER_NAME}
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
            sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
            '''
        }
    }
} 
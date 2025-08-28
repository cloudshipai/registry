# DevOps Troubleshooting Suite

Intelligent agents for debugging and troubleshooting across Local Development, CI/CD, and Server environments.

## Agents Included

### 🖥️ Environment Troubleshooter (Local Development)
- **Purpose**: Investigates "it works on my machine" issues by comparing environment configurations
- **Use Cases**: Dependency mismatches, version conflicts, environment variable differences
- **Capabilities**: Environment debugging, dependency analysis, configuration comparison

### 🔄 Deployment Diagnosis Agent (CI/CD)  
- **Purpose**: Analyzes failed deployments by correlating logs, configs, and recent changes
- **Use Cases**: Pipeline failures, deployment rollbacks, CI/CD optimization
- **Capabilities**: Deployment analysis, pipeline debugging, log correlation, failure analysis

### 🚀 Server Performance Monitor (Server)
- **Purpose**: Identifies performance bottlenecks by analyzing server logs and resource usage
- **Use Cases**: API slowdowns, database performance issues, resource optimization
- **Capabilities**: Performance analysis, bottleneck identification, server optimization

## Installation

```bash
stn template install https://github.com/cloudshipai/registry/raw/main/bundles/devops-troubleshooting-suite/devops-troubleshooting-suite.tar.gz
```

## Configuration

The bundle requires one variable:
- `PROJECT_ROOT`: Root path of your project for analysis (default: `/workspace`)

## Usage Examples

### Environment Troubleshooting
```
My Node.js app works perfectly on my machine but when my colleague tries to run it, they get a "MODULE_NOT_FOUND" error. Can you investigate this?
```

### Deployment Issues
```  
Our CI/CD pipeline deployed successfully but now users can't log in. Error rate increased from 0% to 8% on authentication endpoints. Should we rollback?
```

### Performance Problems
```
Our production API response times went from 200ms to 2 seconds after yesterday's deployment. Can you help investigate what's causing this?
```

## Tags
- devops
- troubleshooting  
- Local Development
- CICD
- Server
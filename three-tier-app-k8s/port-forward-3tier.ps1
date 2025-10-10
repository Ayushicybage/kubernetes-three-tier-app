# port-forward-3tier.ps1

# Frontend service
Start-Process powershell -ArgumentList "kubectl port-forward svc/frontend-nodeport 8080:80"

# Backend service
Start-Process powershell -ArgumentList "kubectl port-forward svc/backend-nodeport 3000:3000"

# MySQL service
Start-Process powershell -ArgumentList "kubectl port-forward svc/mysql 3306:3306"

Write-Host "Port forwarding started:"
Write-Host "Frontend: http://localhost:8080"
Write-Host "Backend: http://localhost:3000"
Write-Host "MySQL: localhost:3306"

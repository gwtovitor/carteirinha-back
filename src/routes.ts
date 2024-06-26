import express, { Router } from 'express'
import UserRoutes from './api/user.routes'

export class routes {

    private router: Router = express.Router()

    public getAllRoutes() {
        console.log('🛣️  Routes')

        this.router.use(UserRoutes())
        
        return this.router
    }
}

export default routes

import { Score } from './score';

export class PortalUserWithScores {
    public Id: number
    public UserName: string
    public FirstName: string
    public LastName: string
    public CreatedDate: Date
    public TotalScore: number
    public Scores: Array<Score>
}
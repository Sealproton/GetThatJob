import { pool } from '../../utils/db.js';

export class ProController {
  //Phun
  async getSingleJob(req, res) {
    const { id } = req.params;
    try {
      const jobID = Number(id);
      const job = await pool.query(
        'SELECT *,jobs.created_at AS job_created_at FROM jobs INNER JOIN recruiters ON recruiters.recruiter_id = jobs.recruiter_id WHERE jobs.job_id = $1',
        [jobID]
      );
      if (!job.rows[0]) {
        return res.json({ message: 'Job not founded' });
      }
      return res
        .status(200)
        .json({ message: 'job query success', job: job.rows[0] });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  async getFollowedJob(req, res) {
    const { userID } = req.query;
    try {
      const jobFollowedData = await pool.query(
        'SELECT * FROM jobs_professional INNER JOIN jobs ON jobs.job_id = jobs_professional.job_id INNER JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id INNER JOIN professionals ON professionals.professional_id = jobs_professional.professional_id WHERE professionals.user_id = $1 AND jobs_professional.job_user_following = true',
        [userID]
      );
      return res
        .status(200)
        .json({ message: 'Get data completed', data: jobFollowedData.rows });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  async getJobFollowStatus(req, res) {
    const userID = req.query.userID;
    const jobID = req.query.job_id;
    try {
      const companyFollow = await pool.query(
        'SELECT jobs_professional.job_professional_id, jobs_professional.job_user_following, jobs_professional.job_user_application FROM jobs_professional INNER JOIN professionals ON professionals.professional_id = jobs_professional.professional_id WHERE professionals.user_id = $1 AND jobs_professional.job_id = $2',
        [userID, jobID]
      );
      return res.json({
        message: 'get following status complete',
        data: companyFollow.rows[0],
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  async updateJobFollowStatus(req, res) {
    const { job_professional_id, job_professional_follow } = req.body.data;
    const updateFollow = await pool.query(
      'UPDATE jobs_professional SET job_user_following = $1, updated_at = $2 WHERE job_professional_id = $3',
      [job_professional_follow, new Date(), job_professional_id]
    );
    return res.status(200).json({ message: 'Update complete' });
  }
  async createJobFollowStatus(req, res) {
    const { userID, job_id } = req.body.data;
    try {
      const professionalID = await pool.query(
        'SELECT professional_id FROM professionals WHERE user_id = $1',
        [userID]
      );
      const addJobProfessional = await pool.query(
        'INSERT INTO jobs_professional (job_user_following,job_user_application,professional_id,job_id,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6)',
        [
          true,
          false,
          Number(professionalID.rows[0].professional_id),
          job_id,
          new Date(),
          new Date(),
        ]
      );
      return res.status(200).json({ message: 'Update complete' });
    } catch (error) {
      console.log(error);
    }
  }
  //Big
  async getAllJobs(req, res) {
    const searchTerm = req.query.searchTerm;
    const category = req.query.category;
    const type = req.query.type;
    const minSalary = req.query.minSalary;
    const maxSalary = req.query.maxSalary;
    const location = req.query.location;
    const queryParams = [];
    const queryParts = [
      'SELECT jobs.job_id, jobs.job_title, jobs.job_category, jobs.salary_min, jobs.salary_max, jobs.job_type, jobs.job_position, jobs.job_mandatory, jobs.job_optional, jobs.created_at, jobs.job_location, recruiters.company_name, recruiters.logo FROM jobs INNER JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id WHERE 1 = 1',
    ];

    if (searchTerm) {
      queryParams.push(searchTerm);
      queryParts.push(
        'AND (UPPER(job_title) ~ UPPER($1) OR UPPER(job_category) ~ UPPER($1) OR UPPER(company_name) ~ UPPER($1) OR UPPER(job_type) ~ UPPER($1) OR UPPER(job_location) ~ UPPER($1))'
      );
    }

    if (category) {
      queryParams.push(category);
      queryParts.push('AND job_category ~ $' + queryParams.length);
    }

    if (type) {
      queryParams.push(type);
      queryParts.push('AND job_type ~ $' + queryParams.length);
    }

    if (minSalary) {
      queryParams.push(minSalary);
      queryParts.push('AND salary_min >= $' + queryParams.length);
    }

    if (maxSalary) {
      queryParams.push(maxSalary);
      queryParts.push('AND salary_max <= $' + queryParams.length);
    }

    if (location) {
      queryParams.push(location);
      queryParts.push('AND job_location ~ $' + queryParams.length);
    }
    // queryParts.push(`LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`);
    // queryParams.push(PAGE_SIZE, offset);
    const query = queryParts.join(' ');
    // const totalQuery = 'SELECT COUNT(*) FROM jobs';
    try {
      const jobs = await pool.query(query, queryParams);
      // const total_page = await pool.query(totalQuery);
      return res.json({
        data: jobs,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  async getPopularJob(req, res) {
    try {
      const popularJobs = await pool.query(
        'SELECT jobs.job_title,jobs.job_category FROM jobs_professional INNER JOIN jobs ON jobs_professional.job_id = jobs.job_id INNER JOIN recruiters ON recruiters.recruiter_id = jobs.recruiter_id WHERE jobs_professional.job_user_following = true GROUP BY jobs.job_id, recruiters.recruiter_id,jobs.job_category ORDER BY count(jobs.job_id) desc limit 8'
      );
      return res.status(200).json({
        message: 'get popular jobs complete',
        popularJobs: popularJobs.rows,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  //Aoo
  async getProfProfile(req, res) {
    const user_id = req.params.id;

    try {
      const result = await pool.query(
        'select * from professionals inner join users on professionals.user_id = users.user_id where users.user_id=$1',
        [user_id]
      );
      // console.log(result.rows[0]);
      return res.json({
        data: result.rows[0],
        message: 'Get Professional profile successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error occurred',
        error: error.message,
      });
    }
  }
  async updatedProfileData(req, res) {
    {
      const user_id = req.params.id;
      const data = req.body;

      try {
        // Start a transaction
        await pool.query('BEGIN');

        // Update the user's professional profile data
        await pool.query(
          `
          UPDATE professionals
          SET
            username = $1,
            phone = $2,
            birthdate = $3,
            linkedin = $4,
            title = $5,
            experience = $6,
            education = $7,
            cv = $8,
            updated_at = NOW()
          WHERE user_id = $9;
          `,
          [
            data.username,
            data.phone,
            data.birthdate,
            data.linkedin,
            data.title,
            data.experience,
            data.education,
            data.cv,
            user_id,
          ]
        );

        // Update the user's email address
        await pool.query(
          `
          UPDATE users
          SET
            email = $1,
            updated_at = NOW()
          WHERE user_id = $2;
          `,
          [data.email, user_id]
        );

        // Commit the transaction
        await pool.query('COMMIT');

        return res.json({
          message: 'Professional profile updated successfully',
        });
      } catch (error) {
        // Rollback the transaction in case of an error
        await pool.query('ROLLBACK');

        console.error('Error updating profile:', error);
        return res.status(500).json({
          message: 'An error occurred while updating the profile',
          error: error.message,
        });
      }
    }
  }
}
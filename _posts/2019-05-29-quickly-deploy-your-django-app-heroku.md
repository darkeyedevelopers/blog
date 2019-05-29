---
layout: post
title: Quickly deploy your Django app to Heroku
featured-img: quickly-deploy-your-django-app-heroku
author: RathiRohit
categories: [Django, Heroku, Hosting]
---
I have been using Heroku for many of my hobby projects and experiments, and everytime I finish my Django application and start to configure it for deploying on Heroku I tend to forget the exact steps. So I thought I should write a post for my future self as well as anyone else who wants to deploy their Django webapp on Heroku platform.

With 512MB RAM, 10K rows of Postgre database, Custom domain support and 1000 dyno hours/month Heroku's free tier is great for hobby and experimental projects. Follow the steps bellow to configure and deploy your Django app to Heroku.
<hr/>
1. Signup on [Heroku][heroku-signup] and then install [Heroku CLI][heroku-cli].


2. Add a file named **Procfile** in project root with following content:
```
    web: gunicorn <django_project_name>.wsgi --log-file -
```
Put your django project name in place of `<django_project_name>`

3. Add a file named **runtime.txt** in project root with the python version your app uses. Ex:
```
    python-3.7.3
```
Here's the list of supported runtimes on Heroku: [Heroku Python Runtimes][heroku-python-runtimes].


4. Install whitenoise, python-decouple, psycopg2-binary, gunicorn and dj-database-url.
```
    pip install whitenoise
    pip install python-decouple
    pip install psycopg2-binary
    pip install gunicorn
    pip install dj-database-url
```


5. Add whitenoise middleware in **settings.py** after django SecurityMiddleware.
```python
    'whitenoise.middleware.WhiteNoiseMiddleware'
```


6. Setup STATIC files details in **settings.py**
```python
    PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATICFILES_DIRS = [
        os.path.join(PROJECT_ROOT, '/static/')
    ]
    STATIC_URL = '/static/'
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```


7. Add a file named **.env** in project root and add all security critical settings as environment variables to it. Ex:
```
    SECRET_KEY=ldoe)s2g_qw*(3^tb-gom9hb*9x8!bye(k6*6#j#m*%9(dz2_r
    DEBUG=True
    USE_SQLITE=True
```
Now replace those critical values from **settings.py** with python-decouple.
```python
    from decouple import config

    SECRET_KEY = config('SECRET_KEY')
    DEBUG = config('DEBUG', default=True, cast=bool)
```
We can use decouple for other values like API keys, Secret keys, Email credentials, etc.

8. Configure database in **settings.py** with dj-database-url:
```python
    import dj_database_url

    DATABASES = {
        'default': dj_database_url.config(
            default=config('DATABASE_URL')
        )
    }
    if(config('USE_SQLITE', default=True, cast=bool)):
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
            }
        }
```


9. Add a file named **requirements.txt** in project root with all required python modules. Ex:
```
    dj-database-url==0.5.0
    Django==2.2.1
    gunicorn==19.9.0
    psycopg2-binary==2.8.2
    python-decouple==3.1
    pytz==2019.1
    sqlparse==0.3.0
    whitenoise==4.1.2
```
If you are using a virtualenv and pip, you can simply run:
```
    pip freeze > requirements.txt
```


10. Login to Heroku CLI, create heroku project in project root and add Postgre DB to it.
```
    heroku login
    heroku create <your_project_app_name>
    heroku addons:create heroku-postgresql:hobby-dev
```
Update `ALLOWED_HOSTS` in **settings.py** with heroku serving domain or your custom domain.


11. Login to [Heroku dashboard][heroku-dashboard], go to your newly created app and access it's settings to add environment variables.
![Heroku Config Vars][heroku-config-vars]


12. If not done already, initialize git repo in project root and add the following entries to **.gitignore**:
```
    db.sqlite3
    .env
```
and commit latest changes to git.


13. Push to heroku to deploy the app:
```
    git push heroku master
```


14. You can migrate the DB and create superusers with:
```
    heroku run python manage.py migrate
    heroku run python manage.py createsuperuser
```


15. That's it, you've successfully deployed your Django app to Heroku!

[heroku-signup]: https://signup.heroku.com/login
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli
[heroku-dashboard]: https://dashboard.heroku.com
[heroku-python-runtimes]: https://devcenter.heroku.com/articles/python-support#supported-runtimes

[heroku-config-vars]: {{site.url}}{{ site.baseurl }}/assets/img/posts/general/heroku-config-vars.png

from fabric.api import *
from fabric.colors import *

env.hosts = ['viewdev.com:2022']
env.directory = '/opt/djoscar/'
LIVE_USER = 'djoscar'

def virtualenv(command):
    with cd(env.directory):
        sudo('source virtualenv/bin/activate && {0}'.format(command), user=LIVE_USER)

def restart():
    print yellow('Reloading ...')
    sudo('touch /etc/uwsgi/apps-enabled/djoscar.ini')   # reload uwsgi as root
    print green('Ready!')

def deps():
    virtualenv('pip install -r requirements.txt')

def db():
    print green('Connection to remote DB...')
    virtualenv('./manage.py dbshell')

def push(should_restart='yes', update_deps='no'):
    print green('Pushing live ...')
    local('git push origin HEAD')
    with cd(env.directory):
        with settings(sudo_user=LIVE_USER):
            sudo('git pull')
            if update_deps == 'yes':
                deps()
            virtualenv('./manage.py syncdb')
            virtualenv('./manage.py sync_perms')
            virtualenv('./manage.py collectstatic')
        if should_restart == 'yes':
            restart()

Hello, to installing the System, we have 2 ways:

- Sign contract with us, and we do the rest for you. Just provide us your Hosting, Domain name.
- If you want to deploy your self, make sure you have follow the requirement.

#REQUIREMENT:
To host the system, make sure your machine's hardware has:
##Minimal

- 4 vCPU
- 8GB Memories.
- 40GB SSD.

##Recommendation

- 4 vCPU
- 16GB Memories.
- 80GB SSD.

If you site is loading huge traffic, please contact us by email.

#Software Requirement:

- OS: Any.
- Git, Docker.io, docker-compose

#Installation steps:

- After downlaod, inside Documents execute:

--- # docker load --input backend.tar
--- # docker load --input frontend.tar
--- # docker-compose -f release.yml up -d

Or you can try to get the images from:
--- # docker pull hoanht140589/hcmus:tagname
--- # With tagname is frontend{{ version | develop }} or backend{{ version | develop }}
--- # docker-compose -f release.yml up -d

FROM linuxserver/kasm

# emulate PID 1
COPY init-wrapper /
ENTRYPOINT ["/init-wrapper"]

# switch from nftables to legacy iptables, otherwise /usr/local/bin/dockerd-entrypoint.sh fails
RUN \
    update-alternatives --set iptables /usr/sbin/iptables-legacy && \
    update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy

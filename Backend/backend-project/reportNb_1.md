part1 of the research :
what are the range of avaialable ports that considering when we build our express server ?
---------------------------------------------
 Well-Known Ports: Ports 0 through 1023 are typically reserved for well-known services and protocols, so it's generally recommended to avoid using these ports for your applications unless absolutely necessary.

Registered Ports: Ports 1024 through 49151 are registered ports, which means they can be registered with the Internet Assigned Numbers Authority (IANA) for specific purposes. While you can technically use these ports for your applications, it's a good idea to check if they are already registered for any specific use.

Dynamic and/or Private Ports: Ports 49152 through 65535 are dynamic and/or private ports. These are commonly used for client-side applications or for temporary purposes. They are often available for use by any application.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

part2 
assuming we have 2 express servers on same port , what is effected ?
--------------------------------------------------
Port Conflict: Only one application can bind to a particular port at any given time. If you attempt to start a second Express server on a port that's already in use by another server, you'll receive an error indicating that the port is already in use. This prevents the second server from successfully starting and listening on the same port.

Address Already in Use Error: When you try to start a server on a port that's already in use, Node.js will throw an EADDRINUSE error, indicating that the address is already in use. This error prevents the server from starting and requires you to either choose a different port or stop the application using the port.

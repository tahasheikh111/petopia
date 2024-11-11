export default function SeedUser() {
    const result=fetch('/api/user/seedUser').then((res) => res.json()).then((response) => console.log(response));
  
    return(
        <div className="container">
            
        </div>
    );
}
public class MementoPatternDemo {
    public static void main(String[] args) {
        //create an Article Object
        Article article=new Article();
        //set id, title,content
        article.setId(1);
        article.setTitle("Article 1");
        article.setContent("Hello Guys!");
        //save state
        article.saveToMemento();

        //change article content and save state
        article.setContent("Hello Guys! Let's implement Memento Pattern");
        article.saveToMemento();

        //change article content and save state
        article.setContent("Hello Guys! Let's implement Memento Pattern."+
                ",Memento pattern is used to restore state of an object to a previous state.");
        //print article details
        System.out.println("Current State : Article id:"+article.getId()+",title:"+article.getTitle()+",content:"+article.getContent());

        System.out.println("Undoing to previous state...");
        article.undoFromMemento();
        System.out.println("Second Saved State : Article id:"+article.getId()+",title:"+article.getTitle()+",content:"+article.getContent());

    }
}
